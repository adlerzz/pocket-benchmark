<script>
    const {logs} = $props();
</script>

<div class="side">
    <label>Console:</label>
    <samp class="console">{logs}</samp>
</div>

<style>
    .side {
        display: flex;
        flex-direction: column;
        max-width: 20%;
        flex-grow: 1;
        padding: 3px;
    }
</style>

