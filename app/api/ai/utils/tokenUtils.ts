// 📁 app/api/ai/utils/tokenUtils.ts
export const TOKEN_LIMITS = { short: 400, medium: 800, long: 1200, very_long: 1800 };
export const TEMPERATURES = {
  story: 0.8,
  character: 0.9,
  world: 0.7,
  dialogue: 0.85,
  plot: 0.75,
  outline: 0.6
};

export const getMaxTokens = (length: string) => TOKEN_LIMITS[length as keyof typeof TOKEN_LIMITS] || 800;
export const getTemperature = (type: string) => TEMPERATURES[type as keyof typeof TEMPERATURES] || 0.8;


