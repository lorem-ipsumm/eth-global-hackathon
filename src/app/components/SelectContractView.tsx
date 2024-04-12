"use client";

import { useAtom } from "jotai";
import { activeContractAtom, activeSidebarViewAtom } from "../utils.ts/atoms";
import { useState } from "react";
import { useContractAbi } from "../hooks/useContractAbi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { BeatLoader } from "react-spinners";

const SelectContractView = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [, setActiveSidebarView] = useAtom(activeSidebarViewAtom);
  const [, setActiveContract] = useAtom(activeContractAtom);

  const { determineContractValidity } = useContractAbi();

  const FormSchema = z.object({
    contractAddress: z.string().length(42, {
      message: "Invalid Address | Incorrect length",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      contractAddress: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsPending(true);
    const isContract = await determineContractValidity(data.contractAddress);
    setIsPending(false);
    if (!isContract) {
      form.setError("contractAddress", {
        type: "validate",
        message: "Invalid Address | Possibly EOA",
      });
      return;
    }
    setActiveContract(data.contractAddress);
    setActiveSidebarView(1);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="contractAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contract Address</FormLabel>
                <FormControl>
                  <Input placeholder="0x123..." {...field} />
                </FormControl>
                <FormDescription>Contract to Integrate with</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {isPending ? (
              <BeatLoader size={10} color="white" />
            ) : (
              "Select Contract"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SelectContractView;
