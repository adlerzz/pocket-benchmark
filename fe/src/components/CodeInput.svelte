<script>
  import CodeFlask from "codeflask";
  import { onMount } from "svelte";
  let ref;
  let linesCount = $state(1);
  let height = $derived((linesCount + 1) * 20);
  let {code = $bindable()} = $props();

  onMount(() => {
    const flask = new CodeFlask(ref, { 
        language: "js",
        lineNumbers: true
    });

    flask.onUpdate( (inpCode) => {
        linesCount = inpCode?.split(/\r?\n/)?.length ?? 1;
        code = inpCode;
    })

    code && flask.updateCode(code);

  });
</script>

<div class="codeinput" style:height="{height}px" bind:this={ref}></div>

<style>
    .codeinput {
        overflow: auto;
        position: relative;
    }
</style>