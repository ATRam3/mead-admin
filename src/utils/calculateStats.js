export const calculateStats = (users, payments = []) => {
  const totalUsers = users.length;
  const proUsers = users.filter((u) => u.isPro === true).length;

  // Active users: those with lastLogin within 30 days (if field exists)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const activeUsers = users.filter((u) => {
    if (!u.lastLogin) return false;
    const loginDate = u.lastLogin.toDate
      ? u.lastLogin.toDate()
      : new Date(u.lastLogin);
    return loginDate > thirtyDaysAgo;
  }).length;

  // Total payments from actual payments collection (or fallback to pro * 200)
  let totalPayments = 0;
  if (payments.length > 0) {
    totalPayments = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  } else {
    totalPayments = proUsers * 200; // fallback
  }

  const conversionRate = totalUsers === 0 ? 0 : (proUsers / totalUsers) * 100;

  return {
    totalUsers,
    proUsers,
    activeUsers,
    totalPayments,
    conversionRate: conversionRate.toFixed(1),
  };
};
