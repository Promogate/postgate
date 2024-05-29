
export async function CurrentUser() {
  return (
    <div className="flex gap-x-4 text-sm items-center">
      <div className="text-right">
        <span className="text-xs text-gray-400">Logado como</span>
        <h3 className="font-medium text-gray-500">email@email.com.br</h3>
      </div>
      <div className="relative w-10 h-10 rounded-full overflow-hidden">
        
      </div>
    </div>
  )
}