export const AI = {
  baseURL: "https://integrate.api.nvidia.com/v1",
  apiKey: process.env.NVIDIA_API_KEY ?? "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",
  models: {
    brain:     "nvidia/llama-3.1-nemotron-ultra-253b-v1",
    fast:      "nvidia/llama-3.3-nemotron-super-49b-v1.5",
    embed:     "nvidia/llama-3.2-nv-embedqa-1b-v2",
    rerank:    "nvidia/llama-3.2-nv-rerankqa-1b-v2",
  },
  reasoning: { 
    on: { temperature: 0.6, top_p: 0.95 },
    off: { temperature: 0 } 
  },
};
