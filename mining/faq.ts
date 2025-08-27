export const miningFaq = [
  {
    question: "Why am I not receiving any rewards?",
    answer:
      "Payouts are sent automatically every 3 hours for work units that have been fully completed and reported. If you still don’t see any rewards after that window, double-check that you’re folding under team 1066107 and that your Folding@Home username is set to your Atto address you wish to receive payouts to. Keep in mind that any work unit already in progress before you changed your team or username will still be credited using the old information."
  },
  {
    question: "Can I use my GPU for Folding@Home?",
    answer:
      "Yes! Folding@Home supports GPU processing for many work units. Using a capable GPU can significantly increase your contribution score compared to using only a CPU. Check the Folding@Home client settings to ensure your GPU is configured correctly."
  },
  {
    question: "How often are Atto rewards distributed?",
    answer:
      "The distribution timing isn't fixed to a strict schedule. Currently, updates and distributions happen roughly every 3 hours on average, but this is not guaranteed and can vary."
  },
  {
    question: "If the updates aren't frequent, do I lose potential rewards?",
    answer:
      "No, no work is lost due to the timing of distributions. The system calculates rewards based on the total time passed since the last distribution cycle and your proportional contribution during that entire period. Whether the updates happen every hour or every 12 hours, the total reward pool for that time is distributed fairly based on reported scores."
  },
  {
    question: "Will I receive Atto rewards for incomplete Folding@Home Work Units (WUs)?",
    answer:
      "No. Atto rewards are distributed based on the points awarded by Folding@Home. Folding@Home only awards points for Work Units that are fully completed and successfully uploaded back to their servers. Incomplete or partially processed WUs do not contribute to your score for Atto reward calculation."
  },
  {
    question: "Can the Atto reward rate (5,000 attos/minute) change?",
    answer:
      "Yes. The default is 5,000 attos/min, but the emission rate is adjusted weekly using a step ladder (5,000 → 4,000 → 3,000 → 2,000 → 1,000 → 500 → 250 → 100) based on the 7-day price change: down moves step the emission down (one step per −1%); up moves (>+1%) step it up by one. If price is stable (−1% to +1%), emissions stay the same. We also maintain an annual guardrail around ~15% of total supply; if we fall behind, emissions may temporarily exceed 5,000/min in stable conditions."
  },
  {
    question: "How can I check my Folding@Home contribution stats?",
    answer:
      "You can monitor your personal progress, completed work units, and estimated points directly within the Folding@Home client software. You can also check team stats on the official Folding@Home website, though there might be a delay."
  },
  {
    question: "Where can I see my received Atto rewards?",
    answer:
      "Your earned Atto will be sent directly to the Atto address you configured as your username in Folding@Home. You can check your balance using your Atto wallet interface or the explorer."
  },
  {
    question: "What happens if I entered the wrong Atto address as my username?",
    answer:
      "Rewards are sent exclusively to the address configured as your Folding@Home username within Team 1066107. If you enter an incorrect or invalid address, the rewards associated with your folding work will be sent to that incorrect address and likely be inaccessible to you. It is crucial to double-check that you have entered your correct Atto address."
  },
  {
    question: "Do I need to run Folding@Home 24/7?",
    answer:
      "No, you can start and stop Folding@Home whenever you like. However, rewards are proportional to your contribution. The more you run it (and the more powerful your hardware), the higher your contribution score will be relative to the team, and thus the larger your share of the distributed attos."
  }
];
