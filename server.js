const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "SonarQube CI/CD Demo is running" });
});

// Intentionally simple code for experimenting with SonarQube rules.
function calculateDiscount(customer) {
  if (customer.type === "premium") {
    return 20;
  }
  return 0;
}

app.get("/discount/:type", (req, res) => {
  const discount = calculateDiscount({ type: req.params.type });
  res.json({ type: req.params.type, discount });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = { app, calculateDiscount };
