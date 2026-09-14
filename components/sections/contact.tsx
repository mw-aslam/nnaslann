"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/sections/section-heading";
import { FloatingField } from "@/components/sections/floating-field";
import { Magnetic } from "@/components/layout/magnetic";
import { SocialIcon } from "@/components/layout/social-icon";
import { SITE, SOCIAL_LINKS } from "@/constants/data";
import { slideInLeft, slideInRight, viewportOnce } from "@/animations/variants";

type FormState = { name: string; email: string; message: string };
type FormErrors = Partial<Record<keyof FormState, string>>;
type SubmitStatus = "idle" | "submitting" | "success";

export function Contact() {
  const t = useTranslations("contact");
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  function validate(values: FormState): FormErrors {
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = t("errors.name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = t("errors.email");
    if (values.message.trim().length < 10) next.message = t("errors.message");
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${SITE.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio xabari: ${form.name}`,
          _template: "table",
        }),
      });

      if (res.ok) {
        setStatus("success");
        setTimeout(() => {
          setStatus("idle");
          setForm({ name: "", email: "", message: "" });
        }, 3500);
      } else {
        throw new Error("Failed to send email");
      }
    } catch {
      const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setForm({ name: "", email: "", message: "" });
      }, 3500);
    }
  }

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-32">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="mt-16 grid gap-8 lg:grid-cols-5">
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="lg:col-span-2"
        >
          <Card className="glow-border flex h-full flex-col justify-between p-8">
            <div>
              <h3 className="text-xl font-semibold text-white">{t("getInTouch")}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">{t("reachOut")}</p>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-6 inline-block text-lg font-medium text-[var(--color-glow)] transition-opacity hover:opacity-80"
              >
                {SITE.email}
              </a>
            </div>
            <div className="mt-10 flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <Magnetic key={social.label} strength={0.4}>
                  <SocialIcon social={social} />
                </Magnetic>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="lg:col-span-3"
        >
          <Card className="glow-border p-8">
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <FloatingField label={t("nameLabel")} error={errors.name}>
                <Input
                  placeholder=" "
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
              </FloatingField>
              <FloatingField label={t("emailLabel")} error={errors.email}>
                <Input
                  type="email"
                  placeholder=" "
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </FloatingField>
              <FloatingField label={t("messageLabel")} error={errors.message}>
                <Textarea
                  placeholder=" "
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                />
              </FloatingField>

              <Button type="submit" variant="accent" size="lg" disabled={status !== "idle"} className="mt-2">
                <AnimatePresence mode="wait" initial={false}>
                  {status === "idle" && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="flex items-center gap-2"
                    >
                      {t("send")} <Send className="h-4 w-4" />
                    </motion.span>
                  )}
                  {status === "submitting" && (
                    <motion.span
                      key="submitting"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 className="h-4 w-4 animate-spin" /> {t("sending")}
                    </motion.span>
                  )}
                  {status === "success" && (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="h-4 w-4" /> {t("success")}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
