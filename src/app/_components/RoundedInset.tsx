export default function RoundedInset({children}: {children: React.ReactNode}) {
    return (
        <section className="rounded bg-dark-25 p-4 w-full h-full overflow-auto relative">
            {children}
        </section>
    )
}