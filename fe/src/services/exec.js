import {defvalues} from "@src/constants/defvalues";

function prepareCode(code, context, indent = 0 ) {
    return code
        .replaceAll(/\$CASE_NUMBER\$/g, `(${context.caseNumber})`)
        .replaceAll(/\$CASES_COUNT\$/g, `(${context.casesCount})`)
        .replaceAll(/\$STORE_RESULT\$\s*\(/g, `$store_res$($ts_item$, `)
        .replaceAll(/\$LOG\$\s*\(/g, `$log$(`)
        .split("\n")
        .map(line => "    " + line)
        .join("\n");
}
function prepareCases(cases, casesCount) {
    return cases.map( (c, caseNumber) => 
        ([
            `var $ts_item$ = {"name": "${c.name}"};`,
            `$ts_item$.start = performance.now();`,
            `for(var $iter$ = 0; $iter$ < $ITERATIONS_COUNT$; $iter$++) {`, 
            prepareCode(c.code, {caseNumber, casesCount}),
            `}`,
            `$ts_item$.stop = performance.now();`,
            `$ts$[${caseNumber}] = $ts_item$;`,
        ].join('\n'))
    );
}


function prepareBench(prescript, cases, postscript) {
    const casesCount = cases.length;
    const executingCode = [
        `var $ts$ = new Array((${casesCount}));`,
        `var $ts_i$ = 0;`,
        `var $store_res$ = (item, value) => { item.result = value };`,
        `var $logs$ = [];`,
        `var $log$ = (value) => {$logs$.push(\`\${value}\`)};`,
        `var $ITERATIONS_COUNT$ = ${defvalues.ITERATIONS_COUNT};`,
        prepareCode(prescript, {caseNumber: -1, casesCount}),
        prepareCases(cases, casesCount).join("\n\n"),
        prepareCode(postscript, {caseNumber: casesCount, casesCount}),
        `return [$ts$, $ITERATIONS_COUNT$, $logs$];`
    ].join('\n');
    console.log(executingCode);    
    return new Function(executingCode);
}

export function execute({prescript, cases, postscript}){
    const exe = prepareBench(prescript, cases, postscript);
    const [result, iterationsCount, logs] = exe();
    return {
        iterationsCount,
        cases: result.map( (c, i) => ({
            "#": i, 
            name: c.name, 
            result: c.result,
            time: (c.stop - c.start).toFixed(3)
        })),
        logs
    };
}