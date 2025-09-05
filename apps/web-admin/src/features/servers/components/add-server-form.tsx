"use client";

import { Button, buttonVariants } from "@merchant/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@merchant/ui/components/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@merchant/ui/components/form";
import { Input } from "@merchant/ui/components/input";
import { zodResolver, useForm, useFormContext } from "@merchant/ui/lib/form";
import { useDialog } from "@merchant/ui/hooks/use-dialog";
import { AddServerSchema, addServer } from "@merchant/validators/forms";
import { api } from "@/features/servers/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@merchant/ui/components/select";
import { httpStatusCodes, Logger } from "@merchant/api-config";

function AddServerForm() {
  const addServerForm = useForm<AddServerSchema>({
    resolver: zodResolver(addServer),
  });

  const { actions, open } = useDialog();

  return (
    <Dialog open={open} onOpenChange={actions.handleOpen}>
      <DialogTrigger
        className={buttonVariants({
          size: "sm",
        })}
      >
        Add Server
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add server</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <Form {...addServerForm}>
          <AddServerFormComponent closeDialog={actions.closeDialog} />
        </Form>
      </DialogContent>
    </Dialog>
  );
}

type AddServerFormComponentProps = {
  closeDialog: () => void;
};

const AddServerFormComponent = ({
  closeDialog,
}: AddServerFormComponentProps) => {
  const formContext = useFormContext<AddServerSchema>();
  const { refetch: refetchServers } = api.useGetServers();

  const { mutateAsync: addServerMutation, isPending } = api.useAddServer();

  const handleSubmit = async (data: AddServerSchema) => {
    try {
      const server = await addServerMutation(data);

      if (!server) {
        throw new Error("Failed to add server");
      }

      refetchServers();
      formContext.reset();
      closeDialog();
    } catch (error) {
      Logger.info({
        message: "Failed to add server",
        statusCode: httpStatusCodes.INTERNAL_SERVER_ERROR,
        details: error,
      });
    }
  };

  const cancelForm = () => {
    formContext.reset();
    closeDialog();
  };

  return (
    <form onSubmit={formContext.handleSubmit(handleSubmit)}>
      <div className="grid gap-4">
        <FormField
          control={formContext.control}
          name="name"
          render={({ field }) => (
            <FormItem className="grid gap-3">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="server" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formContext.control}
          name="description"
          render={({ field }) => (
            <FormItem className="grid gap-3">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="server" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formContext.control}
          name="url"
          render={({ field }) => (
            <FormItem className="grid gap-3">
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="server" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formContext.control}
          name="type"
          render={({ field }) => (
            <FormItem className="grid gap-3">
              <FormLabel>Select Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(addServer.shape.type.enum).map((serverType) => (
                    <SelectItem key={serverType} value={serverType}>
                      {serverType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-col-1 md:grid-cols-2 gap-2">
          <Button disabled={isPending} loading={isPending}>
            Add Server
          </Button>
          <Button variant="secondary" onClick={cancelForm} type="button">
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddServerForm;
