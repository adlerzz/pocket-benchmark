<script>
    let focused = $state(false);
    let {text = $bindable()} = $props();

    const doFocus = () => {
        focused = true;
    }
    const doBlur = () => {
        focused = false;
    }
    const handleKey = (e) => {
        if(e.key === "Enter"){
            doBlur();
        }
    }
</script>

<div>
    {#if focused}
        <input bind:value={text} onblur = {doBlur} onkeydown={handleKey}/>
    {:else}
        <span onclick={doFocus}>{text}</span>
    {/if}
</div>