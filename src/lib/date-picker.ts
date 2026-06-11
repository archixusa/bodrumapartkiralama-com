// Mobil tarih seçici köprüsü (DESIGN_SPEC.md v4 EK — MOBİL TARİH SEÇİCİ).
// Sorun: type="date" alanlarına mobilde (özellikle Android) gövdeye dokununca
// native takvim açılmıyor; kullanıcı "gg/aa/yyyy" segmentlerine yazmaya çalışıyor.
// Çözüm: alana odak/tık olunca currentTarget'in showPicker() metodunu çağır.
// showPicker desteklenmeyen tarayıcıda try/catch ile sessizce native davranışa düşer.
//
// Erişilebilirlik korunur: type=date, bağlı label, min/max ve klavye seçimi aynen
// kalır; readOnly KULLANILMAZ. Tek dokunuş native takvimi açar.
//
// Kullanım — her type="date" input'una:
//   onFocus={openDatePicker} onClick={openDatePicker}

import type { FocusEvent, MouseEvent } from "react";

type DateInputEvent =
  | FocusEvent<HTMLInputElement>
  | MouseEvent<HTMLInputElement>;

export function openDatePicker(e: DateInputEvent): void {
  const input = e.currentTarget as HTMLInputElement & {
    showPicker?: () => void;
  };
  try {
    input.showPicker?.();
  } catch {
    // showPicker desteklenmiyor / kullanıcı jesti dışında çağrıldı:
    // sessizce native davranışa düş — type=date + klavye erişimi korunur.
  }
}
