<script>
  import "@src/styles.css";
  import CodeInput from "@components/CodeInput.svelte";
  import Case from "@components/Case.svelte";
  import {defid} from "@src/services/utils"
  
  const {data = $bindable()} = $props();

  function add(){
    data.cases.push({ name: defid()});
  }

  function del(i){
    data.cases.splice(i, 1);
  }
  
</script>

<div class="main">

    <div class="prescript__section">
        <h2>Prescript</h2>
        <CodeInput bind:code={data.prescript}/>
    </div>

    <div class="cases__section">
        <h2>Cases</h2>
        {#each data.cases as _, index}
            <Case bind:testcase={data.cases[index]} {index} del={() => del(index)}/>
        {/each}

        <button onclick={add}>+</button>
   
    </div>

    <div class="postscript__section">
        <h2>Postscript</h2>
        <CodeInput bind:code={data.postscript}/>
    </div>
</div>

<style>
    .main {
        flex-grow: 5;
    }
</style>