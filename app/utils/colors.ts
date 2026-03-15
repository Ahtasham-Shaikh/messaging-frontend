/**
 * Utility to generate a consistent and beautiful background gradient color 
 * for a user based on their ID or username string.
 */
export const getUserColor = (idOrUsername: string | number) => {
  const colors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-amber-500 to-orange-500',
    'from-emerald-500 to-teal-500',
    'from-rose-500 to-red-500',
    'from-indigo-500 to-blue-500',
    'from-fuchsia-500 to-purple-500',
    'from-violet-500 to-fuchsia-500'
  ]
  
  if (!idOrUsername) return colors[0]
  
  const str = String(idOrUsername)
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash = hash & hash // Convert to 32bit integer
  }
  
  Math.abs(hash)
  
  return colors[Math.abs(hash) % colors.length]
}
