"use client";

import { use_app_state } from "@/context/app-state";
import { Select, SelectItem } from "@/components/ui/select";

export function UserSwitcher() {
  const { users, selected_user_id, set_selected_user_id } = use_app_state();

  return (
    <div className="w-64">
      <Select value={selected_user_id} onChange={(event) => set_selected_user_id(event.target.value)}>
        {users.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            {user.name} ({user.role})
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
