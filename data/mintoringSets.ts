type Item = {
  title: string;
  url: string;
  content: string;
};

type MonitoringSetsType = {
  Monitor: {
    header: string;
    items: Item[];
  };
  Metrics: {
    header: string;
    items: Item[];
  };
};

export const MonitoringSets: MonitoringSetsType = {
  Monitor: {
    header: "Monitor",
    items: [
      {
        title: "Ping",
        content:
          "It monitor the health to url provided. Server is successfully running or not",
        url: "/ping",
      },
      {
        title: "Errors",
        content:
          "Logs the error send by server along with related data. So, update the server code",
        url: "/errors",
      },
      {
        title: "Logs",
        content:
          "Normal Logs to identify how server is running. Help in resolving Error faster",
        url: "/logs",
      },
    ],
  },
  Metrics: {
    header: "Metrics",
    items: [
      {
        title: "API",
        content:
          "It store API related info for metrics, how each api of server is working, in which api load is increasing",
        url: "/apiMetrics",
      },
      {
        title: "Server",
        content:
          "It give info of CPU, RAM, latency, uptime of server. Help in increasing or decreasing server as per load",
        url: "/serverMetrics",
      },
    ],
  },
};

export const MonitoringItems: Item[] = (
  Object.keys(MonitoringSets) as Array<keyof MonitoringSetsType>
).flatMap((key) => MonitoringSets[key].items);
