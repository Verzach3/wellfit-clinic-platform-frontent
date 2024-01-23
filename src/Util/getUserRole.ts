async function getUserRole() {
  return (await window.supabase.from("user_roles").select("roles(name)").single()).data?.roles ?? "";
}

export default getUserRole;