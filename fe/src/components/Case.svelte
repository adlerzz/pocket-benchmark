<script>
    import CodeInput from "@components/CodeInput.svelte";
    import Editable from "./Editable.svelte";
    let {testcase = $bindable(), index, del} = $props();
</script>

<div class="case__section">
    <div class="case__section__header">
        <h3 class="numerator">#{index}</h3>
        <h3> <Editable bind:text = {testcase.name}/></h3>
        <div class="extender"></div>
        <button onclick={() => del(index)}>-</button>
    </div>
    <div class="case__section__body">
        <CodeInput bind:code={testcase.code}/>
    </div>
        
    <div class="case__section__footer">
        <div>
            <label>Time:</label>
            {#if testcase.result}<span>{testcase.time} ms</span>{/if}
        </div>
        <div>
            <label>Result:</label>
            <samp class="console">{testcase.result}</samp>
        </div>
    </div>

    
</div>

<style>
    .case__section {
        border: 4px solid white;
        padding: 5px;
        background-color: #f1eff1;

        .case__section__header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            h3 {
                padding-left: 5px;
            }
        }

        .case__section__footer {
            display: grid;
            grid-template-columns: 150px 1fr;
            min-height: 48px;

            >div {
                display: flex;
                flex-direction: column;

                >label {
                    padding: 3px;
                }
            }
        }
    }

    .numerator {
        color: olive;
        padding: 0 4px;
    }
</style>