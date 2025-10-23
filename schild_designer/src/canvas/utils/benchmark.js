

export function bench( callback, label = 'Benchmark' ) {
    const start = performance.now();
    callback();
    const end = performance.now();
    const duration = end - start;
    console.log(`${label}: ${duration.toFixed(3)}ms`)

}