export const defvalues = {
    PRESCRIPT: 
`const DATA = [...new Array(50).keys()];`,
    CASES: [ 
        {
            name: "1-st",
            code:
`let a = 0, i;
for(i = 0; i < DATA.length; i++){
   a += DATA[i];
}
$STORE_RESULT$(a);`,
        },
        {
            name: "2-nd",
            code:
`$STORE_RESULT$( DATA.reduce( (a,i) => a + i, 0) );`
        }
    ],
    POSTSCRIPT: `$LOG$("DONE");`,
    ITERATIONS_COUNT: 100_000,
};