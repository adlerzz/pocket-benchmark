<script>
    import Main from '@components/Main.svelte';
    import Side from '@components/Side.svelte';
    import {defvalues} from "@src/constants/defvalues";
    import {execute} from "@src/services/exec";
    import {saveToFile} from "@src/services/utils";

    let data = $state({
        prescript: defvalues.PRESCRIPT,
        cases: defvalues.CASES,
        postscript: defvalues.POSTSCRIPT
    });

    let logs = $state();

    function runAll(){
        const result = execute(data)
        logs = result.logs.join('\n');
        data.cases.forEach( (c, i) => {
            c.result = result.cases[i].result;
            c.time = result.cases[i].time;
        });
    }

    function save(){
        saveToFile(data);
    }
</script>
<div class="page">
    <div class="header">
        <h1>Bencher</h1>
        <div class="extender"></div>
        <button onclick={runAll}>Run all</button>
        <button onclick={save}>Save</button>
    </div>
    
    <div class="central">
        <Main bind:data></Main>
        <Side {logs}></Side>
    </div>

    <div class="footer">
        <span>footer</span>
    </div>
</div>

<style>
    .page {
        width: 85%;
        height: 100%;
        margin: auto;
        
        display: grid;
        grid-template-rows: 64px 1fr 24px;
    }

    .header, .footer {
        display: flex;
        align-items: center;
        padding-left: 20px;
        background-color: #e0e4e0;
    }

    .central {
        padding-left: 20px;
        background-color: #f0f4f0;
        display: flex;
        overflow-y: scroll;
    }

    
</style>