import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreatedCampaigns } from "@/store/createdCampaign";
import { nanoid } from "nanoid";
import { Toast } from "@/components/ui/Toast.tsx";
import { useAutoHide } from "@/hooks/useAutoHide.ts";
import { useState } from "react";

type ToastData = {
  status: "success" | "error" | "info";
  message: string;
}

const schema = z.object({
  name: z.string().min(2).max(50),
});

const DaysOfWeek = new Set([
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
])

type FormValues = z.infer<typeof schema>;

export default function CreateCampaignPage() {
  const created = useCreatedCampaigns((state) => state.created);
  const add = useCreatedCampaigns((state) => state.add);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {}
  });
  const { visible, show } = useAutoHide(5000);
  const [toastData, setToastData] = useState<ToastData>({ status: 'success', message: '' });
  const { message, status} = toastData

  function onSubmit(values: FormValues) {
    const exists = created.some(campaign => campaign.name.trim().toLowerCase() === values.name.trim().toLowerCase());
    if (exists) {
      setToastData({ status: 'error', message: 'Duplicate campaign name' });
      show()
      return;
    }

    const installsPerWeek = Array.from(DaysOfWeek, (day) => {
      return { day, value: Math.floor(50 + Math.random() * 300)}
    });

    add({ id: nanoid(), name: values.name, installs: installsPerWeek });
    reset();
    setToastData({ status: 'success', message: 'Creation successful!' });
    show()
  }

  return (
    <section className="max-w-md space-y-4">
      <Toast visible={visible} status={status}>
        {message}
      </Toast>
      <h1 className="text-2xl font-semibold">Create Campaign</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 bg-white p-4 rounded-xl shadow">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input className="mt-1 w-full border rounded px-3 py-2" {...register("name")} />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
        </div>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-xl">Create</button>
      </form>
    </section>
  );
}
