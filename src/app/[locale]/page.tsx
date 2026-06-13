import { setRequestLocale } from "next-intl/server";
import SchedulerApp from "@/components/SchedulerApp";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SchedulerApp />;
}
