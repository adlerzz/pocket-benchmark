export function defid() {
    return Array.from(new Array(8), () => ((Math.random() * 16) | 0).toString(16)).join('');
} 

export function saveToFile(data) {
    if(typeof document === 'undefined'){
        throw new Error("Not supported");
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.setAttribute('download', (new Date()).toISOString().replaceAll(/\D/g, "") + ".bjf"); 
    a.click();

    URL.revokeObjectURL(url);
}