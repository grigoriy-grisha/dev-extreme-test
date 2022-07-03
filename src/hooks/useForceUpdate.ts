import { useCallback, useState } from "react";

function useForceUpdate() {
  const [_, setState] = useState({});
  return useCallback(() => setState({}), []);
}

export default useForceUpdate;
