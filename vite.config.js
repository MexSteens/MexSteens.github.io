import { defineConfig } from "vite";

export default defineConfig({
    resolve: {
        alias: {
        "three-nodes": "three/examples/jsm/nodes",
        }
    },
});