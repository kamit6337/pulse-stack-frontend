"use client";

import dynamic from "next/dynamic";

// const Editor = dynamic(
//   () => import("@monaco-editor/react"),
//   { ssr: false }
// );

import {
  AlertDialog,
  AlertDialogAction,
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
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Editor, { OnMount } from "@monaco-editor/react";
// import * as monaco from "monaco-editor";

const formSchema = z
  .object({
    name: z.string().min(3, "Name is Required"),
    url: z.url(),
    email: z.email(),
    expectCode: z.number().min(200).max(600).optional(),
    responseType: z.enum(["text", "json"]),
    expectText: z.string().optional(),
    expectJson: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.responseType !== "json") return;

    try {
      JSON.parse(data.expectJson ?? "");
    } catch {
      ctx.addIssue({
        code: "invalid_type",
        expected: "object",
        path: ["expectJson"],
        message: "Invalid JSON",
      });
    }
  });
type FormValues = z.infer<typeof formSchema>;

const CreateProject = () => {
  const [open, setOpen] = useState(false);
  const editorRef = useRef<any>(null);
  const [hasJsonErrors, setHasJsonErrors] = useState(false);

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
      url: "",
      email: "",
      expectCode: 200,
      responseType: "text",
      expectText: "",
      expectJson: '{\r\n    "status" : "ok",\r\n    "message" : "Healthy"\r\n}',
    },
  });

  const responseType = watch("responseType");

  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    monaco.editor.onDidChangeMarkers(() => {
      const markers = monaco.editor.getModelMarkers({
        resource: editor.getModel()!.uri,
      });

      setHasJsonErrors(
        markers.some(
          (marker: { severity: any }) =>
            marker.severity === monaco.MarkerSeverity.Error,
        ),
      );
    });
  };

  const onSubmit = async (data: FormValues) => {
    try {
      console.log(data);

      // await api.createProject(data);

      await new Promise((r) => setTimeout(r, 2000));

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
                <FieldLabel htmlFor="url">URL</FieldLabel>
                <Input
                  id="url"
                  {...register("url")}
                  placeholder="Endpoint URL"
                  aria-invalid={!!errors.url?.message}
                  autoComplete="off"
                />
                {errors.url?.message && (
                  <FieldError errors={[{ message: errors.url?.message }]} />
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  {...register("email")}
                  placeholder="Email to send alert"
                  aria-invalid={!!errors.email?.message}
                  autoComplete="off"
                />
                {errors.email?.message && (
                  <FieldError errors={[{ message: errors.email?.message }]} />
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="code">Status Code</FieldLabel>
                <Input
                  id="code"
                  {...register("expectCode", {
                    valueAsNumber: true,
                  })}
                  placeholder="Status Code send by Endpoint"
                  aria-invalid={!!errors.expectCode?.message}
                  autoComplete="off"
                />
                {errors.expectCode?.message && (
                  <FieldError
                    errors={[{ message: errors.expectCode?.message }]}
                  />
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="msg">Message Reponse</FieldLabel>

                <div className="flex justify-between">
                  <Select
                    value={responseType}
                    onValueChange={(value) => {
                      setValue("responseType", value as "text" | "json", {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                  >
                    <SelectTrigger className="w-30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent position="item-aligned" className="w-30">
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>

                  {responseType === "json" && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        editorRef.current
                          ?.getAction("editor.action.formatDocument")
                          ?.run();
                      }}
                    >
                      Format JSON
                    </Button>
                  )}
                </div>

                {responseType === "text" && (
                  <>
                    <Input
                      id="msg"
                      {...register("expectText")}
                      placeholder="Response send by Endpoint"
                      aria-invalid={!!errors.expectText?.message}
                      autoComplete="off"
                    />
                    {errors.expectText?.message && (
                      <FieldError
                        errors={[{ message: errors.expectText?.message }]}
                      />
                    )}
                  </>
                )}
                {responseType === "json" && (
                  <>
                    <Controller
                      control={control}
                      name="expectJson"
                      render={({ field }) => (
                        <Editor
                          value={field.value}
                          onChange={(v) => field.onChange(v ?? "")}
                          height="250px"
                          language="json"
                          theme="vs-dark"
                          onMount={handleEditorMount}
                        />
                      )}
                    />

                    {errors.expectJson?.message && (
                      <FieldError
                        errors={[{ message: errors.expectJson?.message }]}
                      />
                    )}
                  </>
                )}
              </Field>

              <AlertDialogFooter className="mt-6">
                <AlertDialogCancel type="button" onClick={() => handleClose()}>
                  Cancel
                </AlertDialogCancel>

                <Button type="submit" disabled={hasJsonErrors || isSubmitting}>
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
