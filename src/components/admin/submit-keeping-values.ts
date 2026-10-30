import { startTransition, type FormEvent } from "react";

/**
 * onSubmit handler for useActionState forms. React 19 resets a form after its
 * `action` runs, which would wipe everything the admin typed whenever the
 * server returns a validation error — dispatching from onSubmit instead keeps
 * the values in place.
 */
export function submitKeepingValues(formAction: (formData: FormData) => void) {
  return (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitter = (e.nativeEvent as SubmitEvent).submitter;
    const formData = new FormData(e.currentTarget, submitter);
    startTransition(() => formAction(formData));
  };
}
