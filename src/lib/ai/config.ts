export const AI = {
  baseURL: "https://integrate.api.nvidia.com/v1",
  apiKey: process.env.NVIDIA_API_KEY ?? "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",
  models: {
    brain:     "meta/llama-3.3-70b-instruct",
    fast:      "meta/llama-3.1-8b-instruct",
    embed:     "nvidia/llama-3.2-nv-embedqa-1b-v2",
    rerank:    "nvidia/llama-3.2-nv-rerankqa-1b-v2",
  },
  reasoning: { 
    on: { temperature: 0.6, top_p: 0.95 },
    off: { temperature: 0 } 
  },
};
