import { useCallback, useState } from 'react';

export type RuleItem = { id: number; text: string };
export type RuleCard = {
    id: number;
    title: string;
    listType: 'number' | 'star';
    rules: RuleItem[];
};

export function useRulesSection(initialData?: RuleCard[]) {
    const defaultData: RuleCard[] = initialData ?? [
        {
            id: 1,
            title: 'Syarat & Ketentuan Umum',
            listType: 'number',
            rules: [
                { id: 1, text: "Wajib memiliki Akun Triv" },
                { id: 2, text: "Lakukan transaksi untuk mendapatkan persentase keuntungan sebesar-besarnya selama periode kompetisi." },
                { id: 3, text: "Periode kompetisi dimulai pada 20 Juni 2022 - 20 Juli 2022" },
                { id: 4, text: "Kompetisi ini diberlakukan untuk seluruh member Triv tanpa terkecuali." },
                { id: 5, text: "Pemenang Side Quest (Juara Harapan) bisa diraih dengan mengikuti aturan di halaman Triv Quest Reward" },
                { id: 6, text: `Gabung dengan komunitas member Triv lainnya di <a href="https://t.me/TrivofficialGroup" className="text-gray-800  hover:text-white dark:hover:text-white dark:text-blue-600">Telegram</a> untuk mendapatkan update seputar market untuk membantumu menganalisa pergerakan harga.` },
                { id: 7, text: "Follow social media Triv <a href=\"https://www.instagram.com/trivindo/?hl=id\" className=\"text-gray-800 hover:text-white dark:hover:text-white dark:text-blue-600\">Instagram</a> dan <a href=\"https://www.facebook.com/TrivIndonesia/\" className=\"text-gray-800 hover:text-white dark:hover:text-white dark:text-blue-600\">Facebook</a> untuk mendapatkan update seputar pemenang Mingguan." }
            ]

        },
        {
            id: 2,
            title: 'Ketentuan Hadiah',
            listType: 'star',
            rules: [
                { id: 1, text: "Peserta harus memiliki KTP" },
                { id: 2, text: "Peserta boleh perorangan maupun korporasi" },
                { id: 3, text: "Internal Triv tidak diikutkan dalam kompetisi" },
                { id: 4, text: "Peserta hanya melakukan transaksi jual beli saja (staking dan gadai tidak termasuk)" },
                { id: 5, text: "Hasil Likuidasi posisi di atas tanggal 20 Juli 2022 tidak dihitung" }
            ]
        },
    ];

    const [cards] = useState<RuleCard[]>(defaultData);
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const toggle = useCallback((id: number) => {
        setExpandedId((prev) => (prev === id ? null : id));
    }, []);

    const isExpanded = useCallback(
        (id: number) => expandedId === id,
        [expandedId],
    );

    return {
        cards,
        expandedId,
        toggle,
        isExpanded,
    }
}