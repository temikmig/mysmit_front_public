export interface ParsedClientInput {
  firstName: string;
  lastName: string;
  phone: string;
}

export const parseClientInput = (value: string): ParsedClientInput => {
  const parts = value.trim().split(/\s+/);

  let firstName = "";
  let lastName = "";
  let phone = "";

  if (parts.length === 0) {
    return { firstName, lastName, phone };
  }

  firstName = parts[0];

  if (parts.length >= 2) {
    lastName = parts[1];
  }

  if (parts.length >= 3) {
    const maybePhone = parts[parts.length - 1];
    const isPhone = /^[+()\d-]+$/.test(maybePhone);

    if (isPhone) {
      phone = maybePhone;
      lastName = parts.slice(1, -1).join(" ");
    } else {
      lastName = parts.slice(1).join(" ");
    }
  }

  return { firstName, lastName, phone };
};
