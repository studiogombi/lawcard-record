import { useState } from "react";

export default function SimpleHouseholdLedger() {
  const [budget] = useState(500000); // 초기 예산 50만원
  const [expenses, setExpenses] = useState([]);
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseDate, setExpenseDate] = useState(new Date().toISOString().split('T')[0]);

  // 총 지출 계산
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // 잔액 계산
  const remainingBudget = budget - totalExpenses;

  // 지출 추가
  const addExpense = () => {
    const amount = parseFloat(expenseAmount);
    
    if (!amount || amount <= 0) {
      alert("올바른 금액을 입력해주세요!");
      return;
    }
    
    if (amount > remainingBudget) {
      alert("예산을 초과합니다!");
      return;
    }

    const newExpense = {
      id: Date.now(),
      amount: amount,
      description: expenseDescription || "지출",
      date: expenseDate
    };

    setExpenses([...expenses, newExpense]);
    setExpenseAmount("");
    setExpenseDescription("");
  };

  // 지출 삭제
  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  // 전체 리셋
  const resetAll = () => {
    if (window.confirm("모든 지출 내역을 삭제하고 처음부터 시작하시겠습니까?")) {
      setExpenses([]);
      setExpenseAmount("");
      setExpenseDescription("");
      setExpenseDate(new Date().toISOString().split('T')[0]);
    }
  };

  // 숫자를 천 단위로 구분하여 표시
  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  // 날짜 포맷팅 (YYYY-MM-DD -> MM/DD)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        💰 간단한 가계부
      </h1>

      {/* 예산 및 잔액 표시 */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">초기 예산:</span>
          <span className="font-semibold text-lg">₩{formatNumber(budget)}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">총 지출:</span>
          <span className="font-semibold text-lg text-red-600">₩{formatNumber(totalExpenses)}</span>
        </div>
        <div className="flex justify-between items-center border-t pt-2">
          <span className="text-gray-800 font-semibold">잔액:</span>
          <span className={`font-bold text-xl ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ₩{formatNumber(remainingBudget)}
          </span>
        </div>
        {expenses.length > 0 && (
          <button
            onClick={resetAll}
            className="mt-3 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
          >
            🔄 전체 리셋
          </button>
        )}
      </div>

      {/* 지출 입력 폼 */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">지출 추가</h2>
        <div className="space-y-3">
          <input
            type="number"
            placeholder="금액을 입력하세요"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="지출 내용 (선택사항)"
            value={expenseDescription}
            onChange={(e) => setExpenseDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={expenseDate}
            onChange={(e) => setExpenseDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addExpense}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
          >
            지출 추가
          </button>
        </div>
      </div>

      {/* 지출 내역 */}
      {expenses.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-800">지출 내역</h2>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {expenses.map((expense) => (
              <div key={expense.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{expense.description}</div>
                  <div className="text-sm text-gray-500">{formatDate(expense.date)}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-red-600">₩{formatNumber(expense.amount)}</span>
                  <button
                    onClick={() => deleteExpense(expense.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 예산 초과 경고 */}
      {remainingBudget < 0 && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
          ⚠️ 예산을 ₩{formatNumber(Math.abs(remainingBudget))} 초과했습니다!
        </div>
      )}
    </div>
  );
}