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
import { Checkbox } from "../../components/ui/checkbox";
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
    isProxy: z.boolean(),
    contractImplementation: z.union([
      z.string().length(0),
      z.string().length(42, {
        message: "Invalid Address | Incorrect length",
      }),
    ]),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      contractAddress: "",
      contractImplementation: "",
      isProxy: false,
    },
  });

  const { watch } = form;
  const isProxy = watch("isProxy");

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsPending(true);

    let isContract;

    if (!isProxy && !data.contractImplementation) {
      isContract = await determineContractValidity(data.contractAddress);

      if (!isContract) {
        form.setError("contractAddress", {
          type: "validate",
          message: "Invalid Address | Possibly EOA",
        });
      }
    } else {
      isContract = await determineContractValidity(
        data.contractImplementation!,
      );

      if (!isContract) {
        form.setError("contractImplementation", {
          type: "validate",
          message: "Invalid Address",
        });
      }
    }
    setIsPending(false);
    if (!isContract) return;
    setActiveContract(data.contractAddress);
    setActiveSidebarView(1);
  };

  return (
    <div className="flex h-full items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="contractAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-center">
                  Contract Address
                </FormLabel>
                <FormControl>
                  <Input placeholder="0x123..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isProxy"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                <FormLabel className="font-normal">Proxy?</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {isProxy ? (
            <FormField
              control={form.control}
              name="contractImplementation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-center">
                    Implementation Address
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="0x123..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            ""
          )}
          <div className="flex items-center justify-center">
            <Button type="submit">
              {isPending ? (
                <BeatLoader size={10} color="white" />
              ) : (
                "Select Contract"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SelectContractView;
