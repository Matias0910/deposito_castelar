import React from 'react';
import { Planilla, PlanillaTipo, OficioId, ItemEntry, Section, Subgroup } from '@/lib/store';

// Mock data - replace with actual data fetching logic
const planillaData: Record<PlanillaTipo, Planilla> = {
    'diaria': { id: '1', name: 'Planilla Diaria', sections: [] },
    'semanal': { id: '2', name: 'Planilla Semanal', sections: [] },
    'mensual': { id: '3', name: 'Planilla Mensual', sections: [] },
};

interface HistorialPlanillasProps {
    selectedOficio: OficioId | 'todos';
    onCargar: (data: any) => void;
}

const HistorialPlanillas: React.FC<HistorialPlanillasProps> = ({ selectedOficio, onCargar }) => {
    const tipoPlanilla: PlanillaTipo = 'diaria'; // Example type

    const handleCargarClick = () => {
        onCargar({ oficio: selectedOficio, planilla: tipoPlanilla });
    };

    const planilla = planillaData[tipoPlanilla];

    const renderValue = (value: "si" | "no" | "N/A" | "ok" | "nok") => {
        if (value === "si" || value === "ok") {
            return <span style={{ color: 'green' }}>✔</span>;
        }
        if (value === "no" || value === "nok") {
            return <span style={{ color: 'red' }}>✖</span>;
        }
        return <span>{value}</span>;
    };

    return (
        <div>
            <h1>Historial de Planillas - {selectedOficio}</h1>
            <button onClick={handleCargarClick}>Cargar</button>
            {planilla ? (
                <div>
                    <h2>{planilla.name}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Sección</th>
                                <th>Subgrupo</th>
                                <th>Item</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {planilla.sections.map((section, sectionIndex: number) => (
                                section.subgroups.map((subgroup, subgroupIndex: number) => (
                                    subgroup.items.map((item, itemIndex: number) => (
                                        <tr key={`${sectionIndex}-${subgroupIndex}-${itemIndex}`}>
                                            <td>{section.name}</td>
                                            <td>{subgroup.name}</td>
                                            <td>{item.name}</td>
                                            <td>{renderValue(item.value)}</td>
                                        </tr>
                                    ))
                                ))
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No hay datos para la planilla seleccionada.</p>
            )}
        </div>
    );
};

export default HistorialPlanillas;

// Mock types that should be in @/lib/store or @/lib/definitions

declare module '@/lib/store' { // Moved to a declare module block for proper export
    export type PlanillaTipo = 'diaria' | 'semanal' | 'mensual';
    export type OficioId = 'carpinteria' | 'electricidad' | 'plomeria';

    export interface ItemEntry {
        name: string;
        value: "si" | "no" | "N/A" | "ok" | "nok"; // Added "ok" and "nok"
    }

    export interface Subgroup {
        name: string;
        items: ItemEntry[];
    }

    export interface Section {
        name: string;
        subgroups: Subgroup[];
    }

    export interface Planilla {
        id: string;
        name: string;
        sections: Section[];
    }
}

declare module '@/lib/definitions' {
    export type OficioId = 'carpinteria' | 'electricidad' | 'plomeria';
}