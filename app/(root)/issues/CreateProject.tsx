"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { postReq } from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import { errosProjectQuery } from "@/modules/issues/issuesProject.query";

type BackendFrameworkType = "nodejs" | "expressjs" | "fastify";

type BackendFrameworkArrType = {
  name: string;
  value: BackendFrameworkType;
};

const backendFrameworkArr: BackendFrameworkArrType[] = [
  {
    name: "Node JS",
    value: "nodejs",
  },
  {
    name: "Express JS",
    value: "expressjs",
  },
  {
    name: "Fastify",
    value: "fastify",
  },
];

const formSchema = z.object({
  name: z.string().min(3, "Name is Required"),
  backendFramework: z.enum(
    ["nodejs", "expressjs", "fastify"],
    "Please select one of framework",
  ),
});

type FormValues = z.infer<typeof formSchema>;

const CreateProject = () => {
  const [open, setOpen] = useState(false);
  const { refetch } = useQuery(errosProjectQuery(false));

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const responseType = watch("backendFramework");

  const onSubmit = async (data: FormValues) => {
    try {
      console.log(data);

      // await api.createProject(data);

      const response = await postReq("/issues/project", data);
      console.log("RESPONSE", response);
      refetch();
      // await new Promise((r) => setTimeout(r, 2000));

      reset();

      // Close ONLY after success
      setOpen(false);
    } catch (err) {
      console.error(err);

      // Show toast
      // Dialog stays open
    }
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button>Create Project</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-10/12 overflow-y-scroll">
        <AlertDialogTitle>Create a new Project</AlertDialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Project Name</FieldLabel>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Project Name"
                  aria-invalid={!!errors.name?.message}
                  autoComplete="off"
                />
                {errors.name?.message && (
                  <FieldError errors={[{ message: errors.name?.message }]} />
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="msg">Backend Framework</FieldLabel>

                <Select
                  value={responseType}
                  onValueChange={(value) => {
                    setValue(
                      "backendFramework",
                      value as BackendFrameworkType,
                      {
                        shouldValidate: true,
                        shouldDirty: true,
                      },
                    );
                  }}
                >
                  <SelectTrigger className="max-w-60">
                    <SelectValue placeholder="Select Framework" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned" className="w-60">
                    {backendFrameworkArr.map((u) => {
                      return (
                        <SelectItem key={u.name} value={u.value}>
                          {u.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {errors.backendFramework?.message && (
                  <FieldError
                    errors={[{ message: errors.backendFramework?.message }]}
                  />
                )}
              </Field>

              <AlertDialogFooter className="mt-6">
                <AlertDialogCancel type="button" onClick={() => handleClose()}>
                  Cancel
                </AlertDialogCancel>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create"}
                </Button>
              </AlertDialogFooter>
            </FieldGroup>
          </FieldSet>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateProject;
