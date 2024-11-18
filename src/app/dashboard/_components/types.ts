export type InfrastructureData = {
  success: boolean;
  msg: string;
  data: {
    blockStorage: {
      blocks: any[];
      meta: { total: number; links: { next: string; prev: string } };
    };
    instances: {
      instances: any[];
      meta: { total: number; links: { next: string; prev: string } };
    };
    db: {
      databases: any[];
      meta: { total: number };
    };
  };
};

export type Message = {
  role: "user" | "assistant";
  content: string;
};

export type DatabaseItem = {
  name: any;
  type: string;
  region: any;
  replicas: number;
  databaseEngine: string;
  status: string;
  password: string;
  user: string;
  port: string;
};

export type ServerItem = {
  name: any;
  region: any;
  instances: any;
  ip: string;
  status: any;
};

export type CostData = {
  name: string;
  database: number;
  server: number;
  network: number;
};

export type BlockStorageItem = {
  id: string;
  name: string;
  size: number;
  status: string;
  cost: number;
};
