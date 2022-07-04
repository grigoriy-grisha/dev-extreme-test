import { useEffect, useState } from "react";
import { mockData } from "utils/mock";
import sleep from "utils/sleep";

function useLoadMockData() {
  const [data, setData] = useState<typeof mockData>([]);

  useEffect(() => {
    sleep(1500).then(() => setData(mockData));
  });

  return data;
}

export default useLoadMockData;
