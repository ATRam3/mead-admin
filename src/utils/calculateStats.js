export const calculateStats = (users, payments = []) => {
  const totalUsers = users.length;

  const proUsers = users.filter((u) => u.isPro === true).length;

  const totalPayments = 200 * proUsers;

  const conversionRate = totalUsers === 0 ? 0 : (proUsers / totalUsers) * 100;

  return {
    totalUsers,
    proUsers,
    totalPayments,
    conversionRate: conversionRate.toFixed(1),
  };
};
