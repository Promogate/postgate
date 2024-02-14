export   const handlePlanTypeName = (accountLevel: string) => {
  if (accountLevel === "FREE") {
    return "Gratuito"
  }
  if (accountLevel === "BEGINNER") {
    return "Iniciante"
  }
  if (accountLevel === "PROFESSIONAL") {
    return "Profissional"
  }
  if (accountLevel === "BUSINESS") {
    return "Empresa"
  }
}