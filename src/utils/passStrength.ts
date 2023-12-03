export const definePasswordStrength = (pass: string): 'strong' | 'medium' | 'weak' => {
  if (pass.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/)) {
    return 'strong';
  } else if (pass.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{4,7}$/)) {
    return 'medium';
  } else {
    return 'weak';
  }
};
