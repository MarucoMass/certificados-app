<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\IOFactory;

use function Termwind\render;

class StudentController extends Controller
{
    public function index()
    {
        return Student::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required',
            'apellido' => 'required',
            'dni' => 'required',
            'email' => 'nullable|email'
        ]);

        if($validated)
        {
            $student = Student::create($validated);
            return $student;
        }
    }
    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'nombre' => 'required',
            'apellido' => 'required',
            'dni' => 'required',
            'email' => 'nullable|email'
        ]);

        if($validated)
        {
            $student = Student::findOrFail($id);
            $student->update($validated);
            return $student;
        }
    }

    public function destroy($id)
    {
        $student = Student::findOrFail($id);
        $student->delete();

        return response()->json(['message' => 'Alumno eliminado con éxito'], 200);
    }

    public function uploadExcel(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls',
        ]);

        $file = $request->file('file');
        $spreadsheet = IOFactory::load($file->getPathname());
        $sheet = $spreadsheet->getActiveSheet();
        $rows = $sheet->toArray();

        $added = 0;

        $isHeader = false;
        if (strtolower($rows[0][0]) === 'nombre' || strtolower($rows[0][1]) === 'apellido' || strtolower($rows[0][2]) === 'dni' || strtolower($rows[0][3]) === 'email') {
            $isHeader = true;
        }

        foreach ($rows as $index => $row) {

            if ($isHeader && $index === 0) {
                continue; 
            }

            if (Student::where('dni', $row[2])->exists()) {
                continue; 
            }

            Student::create([
                'nombre' => $row[0] ?? null,
                'apellido' => $row[1] ?? null,
                'dni' => $row[2] ?? null,
                'email' => $row[3] ?? null,
            ]);

            $added++; // Contar los registros agregados
        }

        return response()->json([
            'message' => $added !== 0 ? "$added alumnos agregados correctamente" : "No se han agregado alumnos debido a duplicados de DNI",
            'added' => $added
        ]);
    }

    public function uploadExcelPreview(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls',
        ]);

        $file = $request->file('file');
        $spreadsheet = IOFactory::load($file->getPathname());
        $sheet = $spreadsheet->getActiveSheet();
        $rows = $sheet->toArray();

        // Retornar solo las primeras 5 filas para la previsualización (puedes ajustar este número)
        $previewData = array_slice($rows, 0, 5);

        return response()->json($previewData);
    }
}
