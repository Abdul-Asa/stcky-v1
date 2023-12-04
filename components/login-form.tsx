"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  FormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Magic, RPCError } from "magic-sdk";
import showToast from "@/lib/show-toast";
import { useRouter } from "next/navigation";
import { OAuthExtension } from "@magic-ext/oauth";

const formSchema = z.object({
  email: z.string().email(),
});

const API_KEY = process.env.NEXT_PUBLIC_MAGIC_API_KEY as string;

export default function LoginForm() {
  const router = useRouter();
  const magic =
    typeof window != "undefined" &&
    new Magic(API_KEY, { extensions: [new OAuthExtension()] });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!magic) return console.log("Magic not initialized");

    return magic.auth
      .loginWithEmailOTP(values)
      .then((data) => {
        localStorage.setItem("token", data as string);
        showToast({ message: "Login successful", type: "success" });
        router.push("/space");
      })
      .catch((e) => {
        console.log(e);
        if (e instanceof RPCError) {
          console.log(e.code);
          showToast({ message: e.message, type: "error" });
        }
      });
  }

  const getInfo = async () => {
    if (!magic) return console.log("Magic not initialized");
    const userInfo = await magic.user.getInfo();
    console.log(userInfo);
    showToast({ message: JSON.stringify(userInfo), type: "info" });
  };
  const getLoggedIn = async () => {
    if (!magic) return console.log("Magic not initialized");
    const userInfo = await magic.user.isLoggedIn();
    console.log(userInfo);
    showToast({ message: JSON.stringify(userInfo), type: "info" });
  };
  const logOut = async () => {
    if (!magic) return console.log("Magic not initialized");
    const userInfo = await magic.user.logout();
    console.log(userInfo);
    showToast({ message: JSON.stringify(userInfo), type: "info" });
  };
  const test2 = async () => {
    if (!magic) return console.log("Magic not initialized");
    const userInfo = await magic.wallet.showUI();
    console.log(userInfo);
    showToast({ message: JSON.stringify(userInfo), type: "info" });
  };

  const test = async () => {
    if (!magic) return console.log("Magic not initialized");
    const userInfo = await magic.oauth.loginWithRedirect({
      provider: "google",
      redirectURI:
        "https://auth.magic.link/v1/oauth2/nv981J95Babp04hNpezFiD4e8QlnVc8SosWr6QqGC2U=/callback",
    });
    console.log(userInfo);
    showToast({ message: JSON.stringify(userInfo), type: "info" });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-x-8 space-y-8 "
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                An OTP will be sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Loading..." : "Submit"}
        </Button>
        <Button type="button" onClick={getInfo}>
          Get Info
        </Button>
        <Button type="button" onClick={getLoggedIn}>
          Get Logged In
        </Button>
        <Button type="button" onClick={logOut}>
          Log Out
        </Button>
        <Button type="button" onClick={test2}>
          Wallet
        </Button>
        <Button type="button" onClick={test}>
          UI
        </Button>
      </form>
    </Form>
  );
}
