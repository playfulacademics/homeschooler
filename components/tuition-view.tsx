"use client"

import { useState } from "react"

function generateReceiptId() {
  const num = Math.floor(1000 + Math.random() * 9000)
  return `PA-${num}`
}

export function TuitionView() {
  const [parentName, setParentName] = useState("")
  const [childName, setChildName] = useState("")
  const [receipt, setReceipt] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState<{ parent?: string; child?: string }>({})

  const handleSubmit = () => {
    const newErrors: { parent?: string; child?: string } = {}
    if (!parentName.trim()) newErrors.parent = "Parent name is required."
    if (!childName.trim()) newErrors.child = "Child name is required."

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setReceipt(generateReceiptId())
    }, 1800)
  }

  const handleReset = () => {
    setReceipt(null)
    setParentName("")
    setChildName("")
    setErrors({})
  }

  return (
    <div className="space-y-6">
      {/* Receipt success modal */}
      {receipt && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Payment successful"
        >
          <div className="bg-card rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center relative border-2 border-success/30 animate-in zoom-in-95 duration-300">
            {/* Confetti dots */}
            <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-accent opacity-60" />
            <div className="absolute top-6 right-8 w-2 h-2 rounded-full bg-primary opacity-70" />
            <div className="absolute bottom-8 left-8 w-2 h-2 rounded-full bg-secondary opacity-60" />
            <div className="absolute top-10 left-1/2 w-1.5 h-1.5 rounded-full bg-success opacity-80" />

            <div className="w-20 h-20 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-4 border-2 border-success/30">
              <span className="text-4xl" role="img" aria-label="checkmark">✅</span>
            </div>
            <h3 className="text-2xl font-black text-success mb-1">Payment Successful!</h3>
            <div className="inline-block bg-success/10 border border-success/30 rounded-xl px-4 py-2 mb-4">
              <span className="text-lg font-black text-success font-mono">Receipt #{receipt}</span>
            </div>
            <div className="bg-muted rounded-2xl p-4 text-left space-y-2 mb-5 text-sm">
              <div className="flex justify-between font-semibold">
                <span className="text-muted-foreground">Parent</span>
                <span className="text-foreground font-bold">{parentName}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-muted-foreground">Student</span>
                <span className="text-foreground font-bold">{childName}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-bold">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="text-success font-black text-base">$125.00</span>
              </div>
              <div className="flex justify-between font-semibold text-xs">
                <span className="text-muted-foreground">Date</span>
                <span className="text-foreground">
                  {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground font-semibold mb-4">
              🔒 This is a simulated safe checkout. No real payment was processed.
            </p>
            <button
              onClick={handleReset}
              className="w-full py-3 rounded-2xl bg-success text-white font-black text-base hover:opacity-90 transition-opacity"
            >
              Done — Thank You! 🎉
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-secondary/15 border-2 border-secondary/30 flex items-center justify-center text-3xl flex-shrink-0">
          💳
        </div>
        <div>
          <h2 className="text-2xl font-black text-foreground">Pay Monthly Tuition</h2>
          <p className="text-sm text-muted-foreground font-semibold mt-0.5">
            Simple, safe, and stress-free. Your payment supports our amazing co-op community!
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Payment form */}
        <div className="rounded-2xl border-2 border-border bg-card p-6 shadow-sm space-y-5">
          <h3 className="font-black text-foreground">Your Information</h3>

          {/* Parent Name */}
          <div className="space-y-1.5">
            <label htmlFor="parentName" className="text-sm font-bold text-foreground">
              Parent / Guardian Name <span className="text-accent">*</span>
            </label>
            <input
              id="parentName"
              type="text"
              value={parentName}
              onChange={(e) => {
                setParentName(e.target.value)
                if (errors.parent) setErrors((p) => ({ ...p, parent: undefined }))
              }}
              placeholder="e.g. Jamie Rodriguez"
              className={`
                w-full rounded-xl border-2 bg-input px-4 py-3 text-sm font-semibold text-foreground
                placeholder:text-muted-foreground outline-none transition-all
                focus:border-secondary focus:ring-2 focus:ring-secondary/20
                ${errors.parent ? "border-destructive" : "border-border"}
              `}
            />
            {errors.parent && (
              <p className="text-xs text-destructive font-bold">{errors.parent}</p>
            )}
          </div>

          {/* Child Name */}
          <div className="space-y-1.5">
            <label htmlFor="childName" className="text-sm font-bold text-foreground">
              Child&apos;s Name <span className="text-accent">*</span>
            </label>
            <input
              id="childName"
              type="text"
              value={childName}
              onChange={(e) => {
                setChildName(e.target.value)
                if (errors.child) setErrors((p) => ({ ...p, child: undefined }))
              }}
              placeholder="e.g. Alex Rodriguez"
              className={`
                w-full rounded-xl border-2 bg-input px-4 py-3 text-sm font-semibold text-foreground
                placeholder:text-muted-foreground outline-none transition-all
                focus:border-secondary focus:ring-2 focus:ring-secondary/20
                ${errors.child ? "border-destructive" : "border-border"}
              `}
            />
            {errors.child && (
              <p className="text-xs text-destructive font-bold">{errors.child}</p>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={isProcessing}
            className={`
              w-full py-4 rounded-2xl font-black text-base text-white transition-all
              ${isProcessing
                ? "bg-secondary/60 cursor-not-allowed"
                : "bg-secondary hover:bg-secondary/90 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              }
            `}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              "🔒 Simulate Safe Checkout"
            )}
          </button>

          <p className="text-xs text-center text-muted-foreground font-semibold">
            🛡️ Demo only — no real card data is collected or stored.
          </p>
        </div>

        {/* Summary card */}
        <div className="space-y-4">
          <div className="rounded-2xl border-2 border-secondary/30 bg-secondary/8 p-6">
            <h3 className="font-black text-secondary mb-4 flex items-center gap-2">
              <span>🧾</span> Payment Summary
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-semibold">Monthly Tuition</span>
                <span className="font-black text-foreground">$125.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-semibold">Processing Fee</span>
                <span className="font-black text-success">$0.00</span>
              </div>
              <div className="border-t border-secondary/30 pt-3 flex justify-between items-center">
                <span className="font-black text-foreground">Total Due</span>
                <span className="font-black text-xl text-secondary">$125.00</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-border bg-muted/40 p-4 space-y-2.5">
            <h4 className="font-black text-sm text-foreground">What&apos;s Included 🌟</h4>
            {[
              "Weekly co-op sessions (Mon–Thu)",
              "Field Trip Fridays",
              "All curriculum materials",
              "Hands-on activity supplies",
              "Virtual member access",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-success/20 border border-success/40 flex items-center justify-center text-[10px] font-black text-success flex-shrink-0">
                  ✓
                </span>
                <span className="text-xs font-semibold text-foreground/80">{item}</span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border-2 border-accent/30 bg-accent/8 p-4">
            <p className="text-xs font-bold text-accent flex gap-2">
              <span>⏰</span>
              <span>Tuition is due on the <strong>15th of each month</strong>. Questions? Email us at families@playfulacademics.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
