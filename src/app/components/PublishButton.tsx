"use client";
import { useAtom } from "jotai";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { useWidgetStorage } from "../hooks/useWidgetStorage";
import { activeContractAtom, canvasWidgetsAtom } from "../utils.ts/atoms";
import { useRef, useState } from "react";
import { BeatLoader } from "react-spinners";
import { Upload } from "react-feather";
let window: any = globalThis;

const PublishButton = () => {
  const [publishStep, setPublishStep] = useState<number>(0);
  const [canvasWidgets] = useAtom(canvasWidgetsAtom);
  const [activeContract] = useAtom(activeContractAtom);
  const storage = useWidgetStorage();

  const interfaceHashRef = useRef<string>("");

  const publishClicked = async (e: any) => {
    try {
      // don't close the modal
      e.preventDefault();
      // set the loading state
      setPublishStep(1);
      // upload the widget data
      const response = await storage.uploadWidgetData(
        activeContract as string,
        canvasWidgets,
      );
      const hash = response.data.Hash;
      // set the hash
      interfaceHashRef.current = hash;
      // set the success state
      setPublishStep(2);
    } catch (e) {
      console.log(e);
      setPublishStep(3);
    }
  };

  const renderConfirmation = () => {
    return (
      <>
        <AlertDialogHeader>
          <AlertDialogTitle>Publish Interface</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Are you sure you want to publish this interface?
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogAction onClick={publishClicked}>
            Publish
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </>
    );
  };

  const renderLoading = () => {
    return (
      <>
        <AlertDialogHeader>
          <AlertDialogTitle>Publishing Interface</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Please wait while we publish your interface.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <BeatLoader color="blue" />
        </AlertDialogFooter>
      </>
    );
  };

  const renderSuccess = () => {
    const copyUrlToClipboard = (e: any) => {
      // don't close the modal
      e.preventDefault();
      // use url host to display the interface url
      const interfaceUrl = `${window.location.host}/interface/${interfaceHashRef.current}`;
      navigator.clipboard.writeText(interfaceUrl);
    };

    const viewInterface = (e: any) => {
      e.preventDefault();
      // navigate to the interface page in a new tab
      window.open(`/interface/${interfaceHashRef.current}`, "_blank");
    };

    return (
      <>
        <AlertDialogHeader>
          <AlertDialogTitle>Interface Published</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          <div className="flex flex-col">
            <span>
              Your interface has been successfully published to Filecoin with
              the following hash:
            </span>
            <span className="font-bold">{interfaceHashRef.current}</span>
          </div>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogAction
            className="bg-blue-500 hover:bg-blue-600"
            onClick={viewInterface}
          >
            View Interface
          </AlertDialogAction>
          <AlertDialogAction
            className="bg-blue-500 hover:bg-blue-600"
            onClick={copyUrlToClipboard}
          >
            Copy Interface URL
          </AlertDialogAction>
          <AlertDialogAction onClick={() => setPublishStep(0)}>
            Close
          </AlertDialogAction>
        </AlertDialogFooter>
      </>
    );
  };

  const renderFailure = () => {
    return (
      <>
        <AlertDialogHeader>
          <AlertDialogTitle>Failed to Publish Interface</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          There was an error publishing your interface. Please try again.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogAction>Close</AlertDialogAction>
        </AlertDialogFooter>
      </>
    );
  };

  const renderDialogContent = () => {
    const states = [
      renderConfirmation,
      renderLoading,
      renderSuccess,
      renderFailure,
    ];
    // @ts-ignore
    const currentStep = states[publishStep] ? states[publishStep]() : null;
    return <AlertDialogContent>{currentStep}</AlertDialogContent>;
  };

  const handleOpenChange = (isOpen: boolean) => {
    // reset steps when dialogue is closed
    if (!isOpen) setPublishStep(0);
  };

  return (
    <AlertDialog onOpenChange={handleOpenChange}>
      <AlertDialogTrigger>
        <span className="flex items-center gap-2 transition-all hover:text-blue-500">
          <Upload size={15} />
          Publish Interface
        </span>
      </AlertDialogTrigger>
      {renderDialogContent()}
    </AlertDialog>
  );
};

export default PublishButton;
