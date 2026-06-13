import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// 로케일을 인식하는 내비게이션 래퍼 (Link, redirect, useRouter 등)
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
