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
        {#if !!testcase.result}
            <div class="case__section__footer">
                <div>
                    <label>Time:</label>
                    <span>{testcase.time} ms</span>
                </div>
                <div>
                    <label>Result:</label>
                    <samp class=".console">{testcase.result}</samp>
                </div>
            </div>
        {/if}
    
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
    }

    .numerator {
        color: olive;
        padding: 0 4px;
    }
</style>