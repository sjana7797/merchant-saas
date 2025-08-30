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

  const { mutateAsync: addServerMutation } = api.useAddServer();

  const handleSubmit = async (data: AddServerSchema) => {
    try {
      await addServerMutation(data);
      refetchServers();
      formContext.reset();
      closeDialog();
    } catch (error) {}
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
          name="healthUrl"
          render={({ field }) => (
            <FormItem className="grid gap-3">
              <FormLabel>Health URL</FormLabel>
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
        <div className="grid grid-col-1 md:grid-cols-2 gap-2">
          <Button>Add Server</Button>
          <Button variant="secondary" onClick={cancelForm} type="button">
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddServerForm;
