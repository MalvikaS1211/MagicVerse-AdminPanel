
import {
  waitForTransaction,
  writeContract,
} from "@wagmi/core";
import { toast } from "react-hot-toast";
import {
  MVerse_CONTRACT_ADDRESS,
  MVerse_CONTRACT_ADDRESS_ABI,
} from "../../../../config/config";

export async function payROI(recipients, amounts) {
  const result = await writeContract({
    abi: MVerse_CONTRACT_ADDRESS_ABI,
    address: MVerse_CONTRACT_ADDRESS,
    functionName: "payROI",
    args: [recipients, amounts],
  });
  const res = await waitForTransaction({ hash: result.hash });

  return res;
}
