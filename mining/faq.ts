export const faq = [
  {
    question: "Why am I not receiving any rewards?",
    answer:
      "Reward processing currently runs roughly every 3 hours, although timing can vary. If an eligible completed work unit has not produced a reward after that window, double-check that you’re folding under team 1066107 and that your Folding@Home username is the Atto address where you want to receive rewards. A work unit already in progress when you change your team or username is still credited using the old information."
  },
  {
    question: "Can I use my GPU for Folding@Home?",
    answer:
      "Yes! Folding@Home supports GPU processing for many work units. Using a capable GPU can significantly increase your contribution score compared to using only a CPU. Check the Folding@Home client settings to ensure your GPU is configured correctly."
  },
  {
    question: "How often are Atto rewards distributed?",
    answer:
      "Distribution timing is variable. Under current operations, reward updates and distributions typically happen about every 3 hours."
  },
  {
    question: "If the updates aren't frequent, do I lose potential rewards?",
    answer:
      "A longer update interval does not by itself shorten the calculation period; the reward calculation uses the total time since the previous distribution cycle and each eligible participant’s proportional contribution during that period. The resulting allocation still depends on eligibility, reported scores, and the current reward rules."
  },
  {
    question: "Will I receive Atto rewards for incomplete Folding@Home Work Units (WUs)?",
    answer:
      "Mining rewards are calculated for eligible participants from points reported by Folding@Home. Folding@Home awards points only for Work Units that are fully completed and successfully uploaded, so incomplete or partially processed WUs do not contribute to that score."
  },
  {
    question: "Can the Atto mining reward rate change?",
    answer:
      "Yes. The mining reward rate is variable under the current reward policy. The published Growth Stability Index (GSI) design can scale configured distribution rates, but mining’s current mapping, settings, and cadence must be confirmed from operational records. Check the Growth Stability Index and Distribution documentation for the published mechanism."
  },
  {
    question: "How can I check my Folding@Home contribution stats?",
    answer:
      "You can monitor your personal progress, completed work units, and estimated points directly within the Folding@Home client software. You can also check team stats on the official Folding@Home website, though there might be a delay."
  },
  {
    question: "Where can I see my received Atto rewards?",
    answer:
      "Any mining reward distributed to you is sent to the Atto address configured as your Folding@Home username. You can check that address using your Atto wallet or the explorer."
  },
  {
    question: "What happens if I entered the wrong Atto address as my username?",
    answer:
      "The reward system uses the Atto address configured as your Folding@Home username within Team 1066107. If a reward is distributed while an incorrect or invalid address is configured, it can be sent to that address and become inaccessible to you. Double-check the address before folding."
  },
  {
    question: "Do I need to run Folding@Home 24/7?",
    answer:
      "No, you can start and stop Folding@Home whenever you like. Mining reward allocations are proportional to reported contribution scores, so a higher score relative to the team generally produces a larger share of a distribution cycle when you are eligible."
  }
];
