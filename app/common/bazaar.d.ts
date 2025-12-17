// NOTE: 현재 @x402/extensions의 타입 정의가 실제 값과 맞지 않아 수정 타입 정의 적용
export interface FixedDiscoveryResourcesResponse {
  items: FixedDiscoveryResource[];
  pagination: Pagination;
  x402Version: number;
}

export interface FixedDiscoveryResource {
  accepts: Accept[];
  lastUpdated: string;
  resource: string;
  type: string;
  x402Version: number;
  metadata?: any;
}

interface Accept {
  asset: string;
  description?: string;
  extra?: Extra;
  maxAmountRequired?: string;
  maxTimeoutSeconds: number;
  mimeType?: string;
  network: string;
  outputSchema?: any;
  payTo: string;
  resource?: string;
  scheme: string;
  channel?: string;
  metadata?: AcceptMetadata;
  amount?: string;
}

interface Extra {
  name?: string;
  version?: string;
  avatarUrl?: string;
  chainId?: number;
  decimals?: number;
  eip712?: Eip712;
  iconUrl?: string;
  kind?: string;
  pricing?: ExtraPricing;
  serviceDescription?: string;
  serviceName?: string;
  serviceUrl?: string;
  feePayer?: string;
  modelId?: string;
  schemaName?: string;
  contract?: string;
  method?: string;
  mintPerPayment?: string;
  usdc?: string;
  category?: string;
  network?: string;
  provider?: string;
  service?: string;
  tags?: string[];
  agentId?: string;
  agentName?: string;
  availableCommands?: any[];
  commandParameters?: any;
  commandPricing?: any;
  examplePrompts?: any[];
  features?: any[];
  symbol?: string;
  tokenAmount?: string;
  tokenDecimals?: number;
  tokenSymbol?: string;
}

interface ExtraPricing {
  amount: number;
  currency: string;
  defaultAmount?: number;
  isAgentCall?: boolean;
  isCreateAction?: boolean;
  maxOutputTokens?: number;
  minAmount?: number;
  mode?: string;
  model?: string;
  network: string;
  defaultDiscoveryAmount?: number;
  perCharacterPrice?: number;
  destNetwork?: string;
  feePercent?: number;
  step?: number;
}

interface AcceptMetadata {
  category: string;
  serviceName: string;
  tags: string[];
}

interface Pagination {
  limit: number;
  offset: number;
  total: number;
}
