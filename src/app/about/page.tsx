import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
      <Link href="/" className="inline-flex items-center text-primary mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>
      <div className="prose prose-invert max-w-none space-y-6">
        <h1>About BillBully</h1>
        <p>
          BillBully exists for one simple reason: too many people get taken advantage of financially, and most do not have
          the time, energy, confidence, or resources to fight back.
        </p>
        <p>
          Companies profit from confusion. They profit from hidden fees. They profit when subscriptions are hard to cancel.
          They profit when credit systems feel impossible to navigate. Regular people should not have to accept that.
        </p>
        <p>
          BillBully helps challenge unfair bills, fight shady credit practices, negotiate better outcomes, and escape
          subscription traps so people can keep more of their money without stress, intimidation, or endless phone calls.
          This is not a hype product. It is a protective tool built for real people.
        </p>

        <h2>What We Believe</h2>
        <ul>
          <li>People deserve fairness.</li>
          <li>Systems should not exploit confusion.</li>
          <li>Technology should protect, not manipulate.</li>
          <li>Truth matters more than marketing.</li>
          <li>Integrity beats flashy promises.</li>
        </ul>
        <p>
          We would rather understate what we do and earn trust than overpromise and disappoint.
        </p>

        <h2>How BillBully Helps</h2>
        <p>
          BillBully is designed to stand beside you — not boss you around, not overwhelm you, not scare you with jargon.
          It helps you push back when something feels wrong, understand your options, save time, keep more of your money,
          and feel less powerless.
        </p>
        <p>Calm. Steady. Useful. No games. No tricks. No predatory behavior.</p>
        <p>We will never:</p>
        <ul>
          <li>bury important information</li>
          <li>rely on manipulation or fear tactics</li>
          <li>pretend to be something we are not</li>
          <li>treat you like data instead of a person</li>
        </ul>
        <p>We are here for you, not for the systems that hurt you.</p>

        <h2>Who Built This</h2>
        <p>
          BillBully was built by Kevin Boutilier, a self-taught builder who cares less about hype and more about doing
          meaningful work that protects people. Not a corporate founder. Not a growth-bro. Just someone who believes
          regular people deserve a fair shot and decided to build tools that help.
        </p>

        <h2>Where We’re Going</h2>
        <p>
          BillBully will continue to grow carefully and responsibly, always guided by protection, honesty, human-first
          design, and doing the right thing even when it is not flashy. If it does not align with those values, we do not
          build it.
        </p>

        <h2>If You’ve Ever Felt Taken Advantage Of…</h2>
        <p>
          You are not alone. And you are not wrong. BillBully exists so you do not have to face that stuff by yourself
          anymore. Built for people. Built with integrity. Built to protect.
        </p>

        <h2>About the Founder</h2>
        <div className="not-prose mb-6 flex flex-col items-start gap-6 md:flex-row md:items-center">
          <Image
            src="/aboutpage.png"
            alt="Kevin Boutilier"
            width={220}
            height={220}
            className="h-44 w-44 rounded-2xl object-cover object-top"
            priority
          />
          <div className="space-y-3 text-muted-foreground">
            <p>
              I am Kevin Boutilier, a self-taught builder based in Kitchener, Ontario.
            </p>
            <p>
              I build products that protect people, reduce confusion, and make tech feel human and useful.
            </p>
          </div>
        </div>

        <h3>Why I Build</h3>
        <p>
          I have always cared about making technology that feels human, protects people, and earns trust.
          I am not a career academic or a big-company executive. I learn by building, shipping, and staying
          accountable to the people who use what I make.
        </p>

        <h3>What I Have Built</h3>
        <ul>
          <li>
            <strong>SerenixAI</strong> — an emotional wellness platform focused on honest support, not performative empathy.
          </li>
          <li>
            <strong>SkyRenAI</strong> — an autism communication helper, built simply and intentionally.
          </li>
          <li>
            <strong>SELF Engine</strong> — a safety-first AI governance system built with transparent documentation and guardrails.
          </li>
          <li>
            <strong>BillBully</strong> — a consumer-first financial advocate that helps people fight back on unfair bills and credit issues.
          </li>
        </ul>

        <h3>My Approach</h3>
        <p>
          I try to keep my work grounded: clear language, practical tools, and a strong bias toward user protection.
          I would rather under-promise and deliver than make big claims I cannot back up. If I do not know something,
          I will say so and go find out.
        </p>

        <h3>Where I Am Headed</h3>
        <p>
          My goal is to build a portfolio of products that help regular people regain control — emotionally, financially,
          and technically. I care about safety, transparency, and long-term trust more than hype.
        </p>

        <h2>Contact</h2>
        <p>
          If you want to reach me, email <a href="mailto:Kevin@SerenixDigital.com">Kevin@SerenixDigital.com</a>.
        </p>
      </div>
    </div>
  );
}
