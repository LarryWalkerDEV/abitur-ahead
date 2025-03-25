
/**
 * Utility class for generating unique hexcodes for exams
 */
export class HexcodeGenerator {
  /**
   * Generate a random hexcode
   * @returns {string} 8-character hexcode
   */
  static generateRandom() {
    const randomBytes = new Uint8Array(4);
    crypto.getRandomValues(randomBytes);
    return Array.from(randomBytes)
      .map(b => b.toString(16).padStart(2, '0').toUpperCase())
      .join('');
  }
  
  /**
   * Generate a sequential hexcode based on date
   * @returns {string} 8-character hexcode
   */
  static generateSequential() {
    const now = new Date();
    const year = now.getFullYear() - 2000; // Use last two digits of year
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const sequence = (now.getHours() * 60 + now.getMinutes()) % 256;
    
    return [
      year.toString(16).padStart(2, '0'),
      month.toString(16).padStart(2, '0'),
      day.toString(16).padStart(2, '0'),
      sequence.toString(16).padStart(2, '0')
    ].join('').toUpperCase();
  }
}
